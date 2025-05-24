import type { ReactNode } from "react";
import { rules } from "~/data/drinking-game";

export default function HomePage(): ReactNode {
  return (
    <div className="content">
      <h2>About</h2>

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
