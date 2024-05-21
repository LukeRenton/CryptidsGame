# Cryptids board game
## Table of Contents
1. [For players](#for-players)
    
    1.1 [Description](#description)

    1.2 [Gameplay Overview](#gameplay-overview)

2. [For developers](#for-developers)

    2.1 [File and Code Structure](#file-and-code-structure)

    2.2 [GitHub Branch Naming](#github-branch-naming)

    2.3 [Project Setup](#project-setup)

    2.4 [Deploying to the Server](#deploying-to-the-server)

    2.5 [Versions](#versions)



# For Players

## Description

Cryptids Online is a digital adaptation of the popular board game, Cryptids. This online version allows players to experience the thrill of hunting for elusive creatures from the comfort of their own homes. Engage in strategic deduction and exploration with friends or other players worldwide, as you each strive to be the first to uncover the hidden cryptid's location. Whether you're a seasoned player or new to the game, Cryptids Online offers a captivating and interactive gameplay experience.


## Gameplay Overview

In Cryptids Online, each player takes on the role of a cryptozoologist, racing to locate a mysterious creature known as the cryptid. The game revolves around collecting and analyzing clues to narrow down the possible locations of the cryptid. Players use logic and deduction to interpret these clues and make strategic moves on the map. The first player to correctly identify the cryptid's location wins the game.

### Key Actions

1. **Explore**: Move your token to different locations on the map to gather clues.
2. **Deduce**: Use the clues you've collected to rule out impossible locations.
3. **Challenge**: If you think you know where the cryptid is hiding, issue a challenge and see if you're correct!


# For developers
## File and Code Structure

### General

#### Naming Convention

- We will be using a snake naming convention for variables (e.g. num_users)
  - Motivation: [CamelCase vs. Under_score](https://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf)

#### Comments

1. Comments should be clear.
2. Each file should contain a multi-line comment at the beginning of the file indicating the type of file (component, service, model, etc.).
3. Follow the following comment outline:

| // -- ToDo: ____ | Outline something that still needs to be completed in the file code |
| --- | --- |
| /* Function …. */ | Multi-line comment above function definitions to outline what the function does. Should like similar to multi-line comment @ beginning of file |
| // -- xyz | 1-liner comment to outline a patch of code below it |

### Frontend

#### File Structure

- The code should be structured in a nested folder-file system. Files will be in camel-case naming convention.


The application will have the following folders:

1. Components
    - Contains React component .js files

2. Styles
    - Contains .css files for each component

3. Services
    - Contains .js files that specifically access APIs or produce functional code that does not interfere with a component directly

4. Models
    - Contains .js files that are data models for required objects

5. Pages
    - React component .js files that are specifically pages

## GitHub Branch Naming

- Kebab case when naming

  **Format:** 
  
  ``` 
  <main-idea>/<description-of-idea> 
  ```

  examples:

  ```
  bug/fixing-login-failed

  feature/adding-admin-capabilities

  page/tutorial
  ```

## Project Setup

1. Clone the repository from [GitHub](https://github.com/LukeRenton/CryptidsGame)

```bash
git clone https://github.com/LukeRenton/CryptidsGame
```

2. Navigate to `CryptidsGame/`

```bash
cd CryptidsGame/
```

3. Set up dependencies for local testing, for client

```bash
cd client/
npm install
# ---

```

4. For server (assuming you are in the root directory)

```bash
cd server/
npm install express
```

5. Your project is all set up!

## Deploying to the Server

- Note: Assume you are in the root directory `.../CryptidsGame/`

### 1. Build your React files:

```bash
cd client/
npm run build
# (ensure you return to the root directory for step 2)
cd ..
```

### 2. Push your changes

- **Note:** Make sure you are back in the root directory after building files

```bash
git add . && git commit -m "your commit message" && git push
```

### 3. Merge changes (if not on master branch)

1. Go to [GitHub Repository](https://github.com/LukeRenton/CryptidsGame)
2. Navigate to your selected branch
3. Select "Make a pull request"
4. Ask someone to review your pull request and confirm it
5. Merge the pull request
6. Check out your changes after it has deployed!

[cryptidsgame-app.azurewebsites.net](http://cryptidsgame-app.azurewebsites.net/)

## Versions

- Node: 18.17.0
- Bootstrap: v5