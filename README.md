### Observations

#### General

1. MongoDB Realm extends the MongoDB Atlas capabilities providing a serverless backend with plenty offeatures:
   - Serverless Functions
   - Graphql
   - HTTP Endpoints
   - App Sync
   - Authentication
2. A `project` is a container of `multiple applications` which may refer to different environments. One such case is when you have a project that includes a dev and prod environment.

#### realm-cli

1. MongoDB Realm provides a cli which is used to build your infrastructure. You can also `pull/push` your backend following an Iac approach. This can be useful in a CI/CD setup.
2. Download/Deploy your code on the backend

```
realm-cli pull --remote [appId]

realm-cli push --local [dir] [--yes] [--dry-run] [--include-hosting] [--include-package-json] [--include-node-modules]
```

3. Run serverless functions

```
realm-cli functions run --name [functionName] --args=1 --args=2
```

#### Serverless Functions

1. The service supports serverless functions, which is not something new across serverless backends, but it is still nice to see.
2. Functions lack an efficient development setup. In order to deploy your functions you need to update your code locally, deploy it in MongoDB realm, and then test it. This process is a bit time-consuming and lacks a lot of the benefits having your full setup locally. If frameworks suchs as [Serverless](https://www.serverless.com/) add MongoDB realm in their supporting providers, then the issue can be minimized.

#### HTTP-Endpoints

1. An HTTP endpoint can only be connected with a serverless function, which although its fine most of the cases, it may not be enough on few edge cases.
2. Endpoints share the same base URL. The app id is embedded within the HTTP endpoints base url, which makes it unique.
3. Custom endpoints run in the context of a specific user, which allows your app to enforce rules and validate document schemas for each request.
4. HTTP Endpoints logging is enabled by default, which means that you can inspect your logs running `realm-cli logs list`
5. It doesn't support url parameters, which means that you are forced to use querystrings in order to access specific items. In addition, while traditionally a REST endpoint would look like `/api/v1/todos/:id`, now it's embedded within `/api/v1/todos?id=[id]`, which doesn't allow to separate concerns.

### Serverless Backend Comparison

|                                                          Dimension                                                          |                     Firebase                     |                                    MongoDB Realm                                     |                                                                     Supabase                                                                     |
| :-------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------: | :----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                       Authentication                                                        |                       true                       |                                         true                                         |                                                                       true                                                                       |
|                                                      Storage (assets)                                                       |                       true                       |                                        false                                         |                                                                       true                                                                       |
|                                                           Hosting                                                           |                       true                       |                                         true                                         |                                                                      false                                                                       |
|                                                          Functions                                                          |                true (spark plan)                 |                                         true                                         |                                                               true (experimental)                                                                |
|                                                       HTTP Endpoints                                                        |                      false                       |                           true (custom and autogenerated)                            |                                                               true (autogenerated)                                                               |
|                                                           GraphQL                                                           |                      false                       |                                 true (autogenerated)                                 |                                                               true (autogenerated)                                                               |
|                                                     Centralised Logging                                                     |                       true                       |                                         true                                         |                                                                       true                                                                       |
|                                                         Monitoring                                                          |         true (Performance & Crashlytics)         |                                         true                                         |                       true (only in your DB cluster; no memory and CPU monitoring on serverless functions or API gateway )                       |
|                                                          Analytics                                                          |                       true                       |                                        false                                         |                                                                      false                                                                       |
|                                                      Machine Learning                                                       |                       true                       |                                        false                                         |                                                                      false                                                                       |
|                                                         A/B Testing                                                         |        true (A/B Testing & Remote Config)        |                                        false                                         |                                                                      false                                                                       |
| Multi-environment support (a `project` is a container of multiple apps, with each app referring to a different environment) |                       true                       |                                         true                                         |                                                                       true                                                                       |
|                                                           Testing                                                           | it provides emulators to test your setup locally |                                        false                                         |                                                                      false                                                                       |
|                                                             CLI                                                             |              true (firebase-tools)               |                                   true (realm-cli)                                   |                                                                 true (supabase)                                                                  |
|                                                         Data Layer                                                          |           true (firestore & real-time)           | true (mongdb hosted in MongoDB Atlas which by default provides a cluster of 3 nodes) | true (build on top of postgres providing features such as SQL Editor and Table Editor, which alls to configure your data layer through their UI) |
