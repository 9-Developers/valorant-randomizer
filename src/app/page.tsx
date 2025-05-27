import type { ReactNode } from "react";
import { rules } from "~/data/drinking-game";
import Link from "next/link";

export default function HomePage(): ReactNode {
  return (
    <div className="content">
      <h2>About</h2>

      <div className="links">
        <Link href="https://github.com/9-Developers/valorant-randomizer" target="_blank">
          <svg className="github-icon"
               width="98"
               height="96"
               xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            />
          </svg>
          <span>Contribute</span>
        </Link>
      </div>

      <p className="about">
        Welcome to Valorant randomizer! Use the nav bar to go to either the
        agent or weapon page, or to change the theme. The title at the top of
        the screen will bring you back here to the home page.
      </p>
      <p className="about">
        Valorant randomizer allows you to get a random agent, weapon, or entire
        loadout. We even have a drinking game!
      </p>

      <h2>Drinking game 1</h2>

      <p className="about">Remember to drink responsibly.</p>

      <ul>
        <li>Drink each round you get more than 2 kills</li>
        <li>???</li>
      </ul>

      <h2>Drinking game 2 (per-round)</h2>

      <p className="about">
        A different rule for each round. Remember to drink responsibly.
      </p>

      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={index + 1}>
              <td className="round">{index + 1}</td>
              <td className="px-1">{rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
