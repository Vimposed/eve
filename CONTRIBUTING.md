# Guide for Contributors
We thank you for choosing to devote your time to further Eve's development. In order to maintain a consistent and healthy ecosystem, we ask that you read and adhere to the following guidelines. These guidelines pertain to how you should go about contributing to this project as a whole.

# Setting up the Project
1. To clone the project and set it up in your local environment, make sure that you have Node.js v(X.X.X) installed, as well as NPM and [TypeScript](https://www.typescriptlang.org/).

2. Next, make a bot application through Discord's developer panel. [How-to GIF](https://i.imgur.com/DZbIwMD.gif). *Keep the token to yourself but copy it for later.*

2. Next, clone the repository using `git clone https://github.com/Vimposed/eve`. 
(Alternatively, `git@github.com:Vimposed/eve.git` for SSH, or `gh repo clone Vimposed/eve` for GitHub CLI.)

3. In the `src` directory, rename `config.example.ts` to `config.ts`. Then, fill out the necessary fields - `token` and `mongo` (`prefix` is optional, but you may want to change the user ID to yours in `owners`) - with the token you copied earlier and the MongoDB information. 
*(Mongo setup GIF, @scrap?)* - Please do this. And also don't forget to provide a Node version. Thank you, @scrap.

4. Lastly, run `npm run dev` and your bot should be online for testing!

## Guidelines

1. **Ensure that your titles and explanations are concise and well-articulated.**

2. **Propose proactive changes.**

3. **No antagonistic behaviour.**
