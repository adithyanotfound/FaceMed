# FaceMed

FaceMed is an innovative mobile application designed to assist healthcare professionals in emergency situations by providing instant access to a patient’s medical history through AI based facial recognition technology.

**Use Case:**  
When a patient is unable to communicate due to an accident or medical condition, FaceMed allows doctors and emergency responders to quickly identify the patient and retrieve crucial medical information such as past surgeries, ongoing medications, allergies, and chronic conditions like diabetes.

**Tech Stack:**
Frontend: React, Express.js, MongoDB, TensorFlow and OpenCV.

# Installation

This document provides instructions on how to set up and start a running instance of `Facemed` on your local system. The instructions are written to be followed in sequence so make sure to go through each of them step by step without skipping any sections.

# Table of Contents

<!-- toc -->
- [Prerequisites](#prerequisites)
  - [Install git](#install-git)
  - [Setting up this repository](#setting-up-this-repository)
  - [Install node.js](#install-nodejs)
  - [Install Required Packages](#install-required-packages)
- [Creating .env file](#creating-env-file)
- [Post Configuration Steps](#post-configuration-steps)
  - [Running FaceMed](#running-FaceMed)

<!-- tocstop -->

These steps are explained in more detail in the sections that follow.

# Prerequisites

In this section we'll explain how to set up all the prerequisite software packages to get you up and running.

## Install git

The easiest way to get the latest copies of our code is to install the `git` package on your computer. <br/>
Follow the setup guide for `git` on official [git docs](https://git-scm.com/downloads).

## Setting up this repository

First you need a local copy of `FaceMed`. Run the following command in the directory of choice on your local system.

1. On your computer create a folder.
2. Open terminal in that folder and clone the repository

   ```bash
   git clone https://github.com/adithyanotfound/FaceMed
   cd Facemed-main
   ```

## Install node.js

Best way to install and manage `node.js` is making use of node version managers. <br/>
Refer to this page https://nodejs.org/en/download/package-manager to install nvm.

To install TypeScript, you can use the `npm` command which comes with `node.js`:

## Install Required Packages

Run the following commands in order to install the packages and dependencies required by the app:

```
cd backend
npm install
cd ..
cd frontend
npm install
```

The prerequisites are now installed. The next step will be to get the app up and running.

# Creating .env file

A file named .env is required in the root directory of talawa-admin for storing environment variables used at runtime. It is not a part of the repo and you will have to create it. For a sample of `.env` file there is a file named `.env.example` in the root directory. Create a new `.env` file by copying the contents of the `.env.example` into `.env` file. Use this command:

```
cp .env.example .env
```

This `.env` file must be populated with the following environment variables for `talawa-admin` to work:

| Variable                     | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| PORT                         | Custom port for Talawa-Admin development purposes |
| REACT_APP_TALAWA_URL         | URL endpoint for talawa-api graphql service       |
| REACT_APP_USE_RECAPTCHA      | Whether you want to use reCAPTCHA or not          |
| REACT_APP_RECAPTCHA_SITE_KEY | Site key for authentication using reCAPTCHA       |

Follow the instructions from the sections [Setting up PORT in .env file](#setting-up-port-in-env-file), [Setting up REACT_APP_TALAWA_URL in .env file](#setting-up-REACT_APP_TALAWA_URL-in-env-file), [Setting up REACT_APP_RECAPTCHA_SITE_KEY in .env file](#setting-up-REACT_APP_RECAPTCHA_SITE_KEY-in-env-file) and [Setting up Compiletime and Runtime logs](#setting-up-compiletime-and-runtime-logs) to set up these environment variables.

## Setting up PORT in .env file

Add a custom port number for Talawa-Admin development purposes to the variable named `PORT` in the `.env` file.

## Setting up REACT_APP_TALAWA_URL in .env file

Add the endpoint for accessing talawa-api graphql service to the variable named `REACT_APP_TALAWA_URL` in the `.env` file.

```
REACT_APP_TALAWA_URL="http://API-IP-ADRESS:4000/graphql/"
```

If you are a software developer working on your local system, then the URL would be:

```
REACT_APP_TALAWA_URL="http://localhost:4000/graphql/"
```

If you are trying to access Talawa Admin from a remote host with the API URL containing "localhost", You will have to change the API URL to

```
REACT_APP_TALAWA_URL="http://YOUR-REMOTE-ADDRESS:4000/graphql/"
```

For additional details, please refer  the `How to Access the Talawa-API URL` section in the INSTALLATION.md file found in the [Talawa-API repo](https://github.com/PalisadoesFoundation/talawa-api).

## Setting up REACT_APP_RECAPTCHA_SITE_KEY in .env file

You may not want to setup reCAPTCHA since the project will still work. Moreover, it is recommended to not set it up in development environment.

Just skip to the [Post Configuration Steps](#post-configuration-steps) if you don't want to set it up. Else, read the following steps.

If you want to setup Google reCAPTCHA now, you may refer to the `RECAPTCHA` section in the INSTALLATION.md file found in [Talawa-API repo](https://github.com/PalisadoesFoundation/talawa-api).

`Talawa-admin` needs the `reCAPTCHA site key` for the `reCAPTCHA` service you set up during `talawa-api` installation as shown in this screenshot:

![reCAPTCHA site key](./public/images/REACT_SITE_KEY.webp)

Copy/paste this `reCAPTCHA site key` to the variable named `REACT_APP_RECAPTCHA_SITE_KEY` in `.env` file.

```
REACT_APP_RECAPTCHA_SITE_KEY="this_is_the_recaptcha_key"
```

## Setting up Compiletime and Runtime logs

Set the `ALLOW_LOGS` to "YES" if you want warnings , info and error messages in your console or leave it blank if you dont need them or want to keep the console clean

# Post Configuration Steps

It's now time to start Talawa-Admin and get it running

## Running Talawa-Admin

Run the following command to start `talawa-admin` development server:

```
npm run serve
```

## Accessing Talawa-Admin

By default `talawa-admin` runs on port `4321` on your system's localhost. It is available on the following endpoint:

```
http://localhost:4321/
```

If you have specified a custom port number in your `.env` file, Talawa-Admin will run on the following endpoint:

```
http://localhost:${{customPort}}/
```

Replace `${{customPort}}` with the actual custom port number you have configured in your `.env` file.

## Talawa-Admin Registration

The first time you navigate to the running talawa-admin's website you'll land at talawa-admin registration page. Sign up using whatever credentials you want and create the account. Make sure to remember the email and password you entered because they'll be used to sign you in later on.

## Talawa-Admin Login

Now sign in to talawa-admin using the `email` and `password` you used to sign up.

# Testing

It is important to test our code. If you are a contributor, please follow these steps.

## Running tests

You can run the tests for `talawa-admin` using this command:

```
npm run test
```

## Debugging tests

You can see the output of failing tests in broswer by running `jest-preview` package before running your tests

```
npm run jest-preview
npm run test
```

You don't need to re-run the `npm run jest-preview` command each time, simply run the `npm run test` command if the Jest Preview server is already running in the background, it'll automatically detect any failing tests and show the preview at `http://localhost:3336` as shown in this screenshot -

![Debugging Test Demo](./public/images/jest-preview.webp)

## Linting code files

You can lint your code files using this command:

```
npm run lint:fix
```

## Husky for Git Hooks

We are using the package `Husky` to run git hooks that run according to different git workflows.

#### pre-commit hook

We run a pre-commit hook which automatically runs code quality checks each time you make a commit and also fixes some of the issues. This way you don't have to run them manually each time.

If you don't want these pre-commit checks running on each commit, you can manually opt out of it using the `--no-verify` flag with your commit message as shown:-

        git commit -m "commit message" --no-verify

#### post-merge hook

We are also running a post-merge(post-pull) hook which will automatically run "npm install" only if there is any change made to pakage.json file so that the developer has all the required dependencies when pulling files from remote.

If you don't want this hook to run, you can manually opt out of this using the `no verify` flag while using the merge command(git pull):

        git pull --no-verify

<br/>
