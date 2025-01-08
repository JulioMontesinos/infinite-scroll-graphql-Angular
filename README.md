# InfiniteScrollAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

This project demonstrates an **infinite scrolling web application** built with Angular. The application fetches data from a GraphQL API and displays a list of images with features like filtering through a search bar, liking items with live updates, and endless scrolling with random images after the API's data limit is reached.

## Features

- **Infinite Scroll**: Automatically loads more images as the user scrolls down.
- **Search Bar**: Filters images based on a search query.
- **Like Button**: Allows users to like images with real-time updates.
- **GraphQL Integration**: Fetches and manipulates data using a GraphQL API.
- **Responsive Design**: Adapts to different screen sizes for a seamless user experience.
- **Send Icon**: Present in the UI but currently has no functionality.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
