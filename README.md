# FaceMed

FaceMed is an innovative web application designed to assist healthcare professionals in emergency situations by providing instant access to a patient’s medical history through AI based facial recognition technology.

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
npm install
cd frontend
npm install
cd ..
cd backend
npm install
cd ..
```

The prerequisites are now installed. The next step will be to get the app up and running.

# Creating .env file

A file named .env is required in the backend directory of FaceMed for storing environment variables used at runtime. It is not a part of the repo and you will have to create it. For a sample of `.env` file there is a file named `.env.example` in the root directory. Create a new `.env` file by copying the contents of the `.env.example` into `.env` file. Use this command:

```
cd backend
cp .env.example .env
```

This `.env` file must be populated `MONGO_DB_URL` and `JWT_SECRET` for `FaceMed` to work.

# Post Configuration Steps

It's now time to start FaceMed and get it running

## Install docker and MongoDB Compass

Docker and MongoDB Compass are not necessary but good to have if trying to setup database locally. <br/>

<b>Installation References:<b/> <br/>
Docker: https://docs.docker.com/engine/install/ <br/>
mongoDB Compass: https://www.mongodb.com/products/tools/compass

## Setting up MongoDB locally

Run the following command to start a `mongoDB` instance locally development server:

```bash
docker run -d --name mongodb -p 27017:27017 -v mongodata:/data/db mongo
```
or get a free cloud database cluster from https://www.mongodb.com/

## Running FaceMed

Now run the following command in the facemed-main directory to run the app.

```
npm start
```

<br/>
