# Toy Drone Game

A toy drone game based on the specifications provided by Games Global, written with NextJS Typescript, TailwindCSS + DaisyUI, and FramerMotion. Testing has been done with Jest.

All graphics have been created by myself with Inkskape and Figma, except for the 10x10 grid, which can be found here: https://media.inkscape.org/media/resources/file/grid_10x10_320px.svg.

I have been using GitHub for pipelines, issue tracking and pull requests, and Vercel for hosting. The production version of this application can be found at: https://drone-game-rose.vercel.app/

## Setup

To run the project, simple load up the folder in your terminal and run `npm install`, followed by `npm run dev` for the local environment, or alternatively running `npm run start` for a production version.

To build the project for deployment, you can run `npm run build`.

When deploying, you will want to set some environment variables for the app title and description, e.g:

```env
APP_TITLE='Drone Game'
APP_DESCRIPTION='A really cool drone'

```

As these will be shown in openGraph links if users change the link with others. These variables are outlined in the `.env.example` file in the root directory.

To run the tests, simply run `npm run test`.

## My process

I opted to take a test-driven development approach for this project and found that to be very successful. I started by reading through the specification and identifying testable aspects. If you read through the tests in `src/__tests__/game.test.ts`, you'll see that they are more-or less cronological to their implementation within the application.

I chose to use NextJS as it is a tool that I am familiar with and is easy to deploy. Given that this application is a single page building a React App without Next may have been a better approach.

Whilst I was writing my tests, I built a prototype layout using a grid identifying which square my drone and protectile were in so that I could visually assess the behaviour of the game.

Once I was happy with the logic aspect of the game I then focused on the UI. I chose to use framer motion for the movement of the drone and the projectile and spent some time familiarising myself with how framer motion works, as I haven't had the opportunity to use it very much in the past. I used placeholder images and a 10x10 svg grid to verify that I could control the location of the drone within a grid system.

Once I was happy that I could position the drone on the screen and that I had logic to control the drone I could focus on combining the 2 aspects together.

Once I had combined the logic and the UI I spent some time polishing up the UI using Tailwind utility classes to adjust the layout for different devices so that there was a good experience on both mobile and desktop.

Having got the drone moving correctly, I took a break from coding and spent some time building a drone graphic and map graphic in figma and then I imported them into my project.

Once I felt that I had a reasonably functional game I spent some time polishing the experience. I wasn't very happy with the absolute rotations that I was performing (which meant that rotation from WEST to NORTH went a whole 270 degrees, rather than just 90), so I spent some time improving that experience.

Ultimately I have really enjoyed working on this assessment and plan to continue making improvements in my own time.

## Known Issues

- When firing an attack, a user can click the move buttons, and since the projectile's location is calculated from the location of the drone, the projectile will also update. This means that a user can fire a projectile and then quickly update the location of the drone to keep the attack moving.
- The timeout function for the protectile is not handled within the Game class, and this opens the game up to issues. I was finding it difficult to access the resultign change to my drone object of the timeout, and therefore I opted to move it to the UI side. I think this is really indicative that using a class was the wrong approach here, and with hindsight I think I would have had more success faster if I had opted to use a React Context, as updates are more easily accessed.
- On some mobile devices the `Place` button is "below the fold", which may reduce the user experience over all, as a user may have to scroll up and down to see where there drone was places. I decided that this was a minor issue and I valued a large map area over this poorer experience.
- If a user rotates their phone, or adjusts their screen size on desktop, then the location of the drone becomes misaligned with the grid. This could have been resolved by setting up a useEffect based on the current screen size and re-calculating the drones location if the the screen size changes, however moving the drone with the `Move` action will also correct this issue.
- When play-testing this game on family members, many people asked me why they couldn't kill the ducks. I personnally found this alarming, but this might identify a desire for a new feature to allow the drone to destroy "targets" positioned on the map.
