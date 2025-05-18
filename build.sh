#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to get the latest version from package.json using Docker
get_current_version() {
    docker run --rm -v "$(pwd):/app" -w /app node:20-slim node -p "require('./package.json').version"
}

# Function to increment version
increment_version() {
    local version=$1
    local type=$2
    
    IFS='.' read -r -a version_parts <<< "$version"
    local major=${version_parts[0]}
    local minor=${version_parts[1]}
    local patch=${version_parts[2]}
    
    case $type in
        "major")
            major=$((major + 1))
            minor=0
            patch=0
            ;;
        "minor")
            minor=$((minor + 1))
            patch=0
            ;;
        "patch")
            patch=$((patch + 1))
            ;;
        *)
            print_error "Invalid version type. Use major, minor, or patch"
            exit 1
            ;;
    esac
    
    echo "$major.$minor.$patch"
}

# Function to update version in package.json using Docker
update_version() {
    local new_version=$1
    docker run --rm -v "$(pwd):/app" -w /app node:20-slim node -e "const pkg = require('./package.json'); pkg.version = '$new_version'; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"
}

# Function to run tests using Docker
run_tests() {
    print_status "Running tests..."
    
    # Create a temporary container for testing
    local test_container="valorant-randomizer-test-$(date +%s)"
    
    # Build the test image
    print_status "Building test image..."
    docker build -t $test_container .
    
    # Run type checking
    print_status "Running type checking..."
    docker run --rm $test_container pnpm typecheck
    
    # Run linting
    print_status "Running linting..."
    docker run --rm $test_container pnpm lint
    
    # Run build to ensure it works
    print_status "Running build..."
    docker run --rm $test_container pnpm build
    
    # Clean up test image
    docker rmi $test_container
    
    print_status "All tests passed successfully!"
}

# Function to clean up old Docker images
cleanup_old_images() {
    print_status "Cleaning up old Docker images..."
    
    # Remove all stopped containers of valorant-randomizer
    print_status "Removing stopped valorant-randomizer containers..."
    docker ps -a --filter ancestor=valorant-randomizer --filter status=exited -q | xargs -r docker rm
    
    # Keep only the 3 most recent versions of valorant-randomizer
    print_status "Keeping only the 3 most recent versions of valorant-randomizer..."
    docker images valorant-randomizer --format "{{.Tag}}" | sort -V | head -n -3 | while read -r tag; do
        if [ ! -z "$tag" ]; then
            print_status "Removing image valorant-randomizer:$tag"
            docker rmi "valorant-randomizer:$tag" || true
        fi
    done
    
    # Remove any dangling images of valorant-randomizer
    print_status "Removing dangling valorant-randomizer images..."
    docker images valorant-randomizer --filter "dangling=true" -q | xargs -r docker rmi
}

# Function to stop any running container
stop_running_container() {
    print_status "Checking for running containers..."
    local running_containers=$(docker ps -q --filter ancestor=valorant-randomizer)
    if [ ! -z "$running_containers" ]; then
        print_status "Stopping running containers..."
        echo "$running_containers" | while read -r container_id; do
            print_status "Stopping container $container_id..."
            docker stop "$container_id"
            print_status "Removing container $container_id..."
            docker rm "$container_id"
        done
        print_status "All containers stopped and removed successfully"
    else
        print_status "No running containers found"
    fi
}

# Main build process
main() {
    print_status "Starting build process..."
    
    # Stop any running container
    stop_running_container
    
    # Get current version
    current_version=$(get_current_version)
    print_status "Current version: $current_version"
    
    # Increment patch version
    new_version=$(increment_version "$current_version" "patch")
    print_status "New version will be: $new_version"
    
    # Run tests before proceeding
    run_tests
    
    # Update version in package.json
    update_version "$new_version"
    print_status "Updated version to $new_version"
    
    # Build Docker image
    print_status "Building Docker image..."
    docker build -t valorant-randomizer:$new_version .
    
    # Run container and verify it works
    print_status "Testing container..."
    
    # Remove any existing container with the same name
    if docker ps -a --filter name=valorant_randomizer | grep -q valorant_randomizer; then
        print_status "Removing existing container with name valorant_randomizer..."
        docker rm -f valorant_randomizer
    fi
    
    # Start the container
    container_id=$(docker run -d --name valorant_randomizer -p 3000:3000 valorant-randomizer:$new_version)
    
    # Wait for container to start
    print_status "Waiting for container to start..."
    sleep 5
    
    # Check if container is running
    if ! docker ps | grep -q valorant_randomizer; then
        print_error "Container failed to start!"
        docker logs valorant_randomizer
        docker rm valorant_randomizer
        exit 1
    fi
    
    # Test if the application is responding
    print_status "Testing application response..."
    if ! curl -s http://localhost:3000 > /dev/null; then
        print_error "Application is not responding correctly!"
        docker logs valorant_randomizer
        docker stop valorant_randomizer
        docker rm valorant_randomizer
        exit 1
    fi
    
    print_status "Container is running and responding successfully!"
    
    # Stop and remove the test container
    print_status "Cleaning up test container..."
    docker stop valorant_randomizer
    docker rm valorant_randomizer
    
    # Clean up old images only after successful build and test
    cleanup_old_images
    
    print_status "Build process completed successfully!"
    print_status "New version: $new_version"
    print_status "Image tag: valorant-randomizer:$new_version"
}

# Run the main function
main 