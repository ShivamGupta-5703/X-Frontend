# Commands -->

1. *Frontend Installation -->*
   a. For Creating Next App      -> `npx create-next-app@latest`
   b. To run development server  -> `npm run dev`
   c. For react icons            -> `npm i react-icons`'

   d. Google Authentication --> 
      a. Install package         -> `npm i @react-oauth/google`
      b. Wrap entire application inside component `GoogleOAuthProvider`
      c. Get client Id  ->
          i. Go to console.cloud.google.com -> Create a new project.
         ii. Go to console.cloud.google.com/apis/credentials.
        iii. Go to OAuth consent screen -> Create new consent screen. 
         iv. Edit name , On which port application is running -> Save and continue
          v. Go to credentials -> Create new credentials -> OAuth client ID
         vi. Select Web application(type) , name your project
        vii. Set from where your request can go `http://localhost:3000`
       viii. Set redirect URI to `http://localhost:3000/signin`
         ix. Click on create. Copy the client id
          x. Use this client id in `GoogleOAuthProvider`.
      
      d. Whenever we signin , a credential will be created, which will contain all user info, and can be used to extract user info.
         Data can be extracted from `https://oauth.googleapis.com/tokeninfo?id_token=credential`

   e. Graphql Client -> Install graphql-request for making graphql request [lightweight GraphQL client] -> `npm i graphql-request`
   f. Codegen -> Generate code from your GraphQL schema and operations with a simple CLI
              -> `npm i graphql`
              -> `npm i -D typescript @graphql-codegen/cli`
              -> `npm i -D typescript @graphql-codegen/client`
              -> `npm i -D typescript @graphql-codegen/client-preset`
              -> GraphQL Code Generator CLI can help you configure your project based on some popular flows:
                     -> `npx graphql-code-generator init`
                     -> Type of application using                                   -- `graphql-request`
                     -> Schema                                                      -- `http://localhost:8000/graphql`
                     -> Operations and Fragments [where we are writing our queries] -- `**/*.{tsx,ts}` [all tsx and ts files]
                     -> Where to generate ioutput                                   -- `gql/`
                     -> introspection file                                          -- `Yes`
                     -> Name of config file                                         -- `codegen.ts`
                     -> Script in package.json to run codegen                       -- `codegen`
                        *Update script to watch changes -> `"codegen": "graphql-codegen --config codegen.ts --watch"`*
              -> To run multiple commands concurrently  -- `npm i concurrently -D`
                 Update the dev script                  -- `"dev": "concurrently \"npm run codegen\" next dev",`
                 And finally `npm run dev` to start the  server.

   g. React Hot Toast [to add notifications]          -> `npm install react-hot-toast`
   h. For creating custom hooks on top of react query -> `npm i @tanstack/react-query`
      For react query devtools                        -> `npm i @tanstack/react-query-devtools`


2. *Backend Installation -->*
   a. Initailising backend                                            -> `npm init -y`
   b. Installig typescript as dev dependency                          -> `npm i typescript -D`
   c. Initialising typescript configuration /  Creating tsconfig.json -> `npx tsc --init`
                                                                      -> set "rootDir" to location of source code.
                                                                      -> set "outDir" to location where you want to place compiled files.
                                                                      -> `npm i tsc-watch -D` - watch changes and compile.

   d. Install express                                                 -> `npm i express`
   e. Custom scripts                                                  -> "start": "node build/index",
                                                                      -> "build": "tsc -p .",                         - compile all code specified in rootDir.
                                                                      -> "dev": "tsc-watch --onSuccess \"npm start\"" - on success compile and build the code.
   
   f. Setup of apollo graphql server -->
       i. Install apollo graphql server                                                   -> `npm i @apollo/server graphql`
      ii. Install graphql                                                                 -> `npm i graphql`
     iii. Install middleware to parse json data                                           -> `npm i body-parser`

         

   g. Setting up Prisma ORM -->
       i. Install Prisma as dev dependency              -> `npm i prisma --save-dev`
      ii. Install Prisma CLI for postgres database      -> `npx prisma init --datasource-provider postgres`
                                                        -> prisma/schema.prisma - where all schema(models) will be defined.
                                                                                - datasource.url      - url of our database (will come from supabase)
                                                                                - client.provider     - type of client we are using that is Javascript.
                                                                                - datasource.provider - type of database we are using.

     iii. Install prisma client                         -> `npm i @prisma/client` 
      iv. Run a migrate to create your database tables  -> `npx prisma migrate dev --name init`  [can replace init with custom message.]

       v. To open prisma studio -> `npx prisma studio` {launches prisma studio at [localhost:5555]} 


   h. Setting up supabase -->
       i. Create a new organization.
      ii. Create a new project.
     iii. Generate a new password (save it), choose area closet to you. [will take time]
      iv. Database -> Connection Settings -> Url -> Copy and paste it in env file. Replace password with your password.


3. *AWS -->* 
  1. Select closest region from menu beside your name for low latency.

  2. Create a user in IAM -->
     a.  Give name -> next
     b. Permission -> attach policy directly -> AWSS3FullAccess -> next -> create user.
     c. Go down to access keys and create a access key -> choose appliaction running outside of aws -> next -> create access key.
     d. Copy access key and secret key in .env file backend. 
   
  3. Create a S3 bucket --> [Simple Storage Service]
     a. Create Bucket.
     b. Uncheck Block all public access.
     c. Check acknowledgement below it.   
     d. Create Bucket.
   
  4. Editing policy of s3 bucket -->
     a. Go to s3 bucket -> properties -> permissions -> bucket policy.
     b. Click on edit bucket policy.
     c. Paste the following code in it ->  [ARN -> Amazon Resource Name] and Save.
        `{
             "Version": "2012-10-17",
             "Statement": [
                 {
                     "Effect": "Allow",                       // allow
                     "Principal": "*",                        // everyone
                     "Action": "s3:GetObject",                // to get an object 
                     "Resource": "BucketARNjustabove/*"      // from this resource
                 }
             ]
         }`

  5. Make CORS -> [Cross Origin Resource Sharing]  and Save.
     -  we have to whitelist our domain, for where we are going to host it.
     - Allow following for domain "http://localhost:3000".
     - Code ->
       `
         [
            {
                 "AllowedHeaders": [
                     "*"
                 ],
                 "AllowedMethods": [
                     "GET",
                     "HEAD",
                     "PUT"
                 ],
                 "AllowedOrigins": [
                     "http://localhost:3000"
                 ],
                 "ExposeHeaders": [],
                 "MaxAgeSeconds": 3000
            }
         ]
      `
  6. How will it work --> To upload images as tweets.
     a. We have a  bucket with anyone can access tag.
     b. Now a user will make a request the server which has a API key(database access).
     c. Server will validate the user and provide a signed url to him.
     d. Now this url will look like aws. something. Now the user can directly upload the images to this particular url.
     e. When the upload is complete, this image will directly go into the bucket.

     -> Since in cors we made a allowed origin, which was localhost:3000, so any request not from this url will give cors error.

     -> AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native->
       `npm i @aws-sdk/client-s3`
      
     -> This package provides a presigner based on signature V4 that will attempt to generate signed url for S3 ->
        `npm i @aws-sdk/s3-request-presigner`


4. *Prisma Schema -->*
   -> for formatting prisma file -> `npx prisma format`
   `
      model Follows{
         // relation id to uniquely identify relation, for which field, referencing what
        follower User @relation("follower", fields: [followerId], references: [id])

        // type string
        followerId String

        following User @relation("following", fields: [followingId], references: [id])
        followingId String

        // we can create unique for both, but here we can create a composite key, if already following or is a follower, cannot follow again.
        @@id([followerId, followingId])
      }
   `

5. *Redis --> [Using Upstash]*
   -> In backend ->
      -  npm i ioredis


6. *Backend Deployment -->*
   1. Starting a Amazon EC2 instance -> [EC2 -> Amazon Elastic Compute Cloud] 
      a. Launch Instance.
      b. Give name, unique to you.
      c. Select Amazon Machine Image - Ubuntu
      d. Select `Free tier eligible`.
      e. Select Instance type - `Free tier available`
         - toggle `All generations` on.
         - t2.micro is free but too slow for node.
         - SO, we will be selecting t2.medium and then turning it off after few hours.

      f. Create a key-pair value which will be used to log into out server ->
             - Create key pair
             - provide a name
             - key type - RSA
             - format   - .pem
      
      g. Network settings ->
         - Toggle -> Allow SSH traffic from Anywhere
                  -> Allow HTTPS traffic
                  -> Allow HTTP traffic
      
      f. Launch Instance.
      g. The instance state will be pending for a while.

   2. Next we need IP for our machine ->
      a. Go to Network & Security -> Elastic Ips
      b. Click on Allocate Elastic Ip address.
      c. Click allocate.

      d. Select Ip address.
      e. Go to actions -> associate elastic ip address.
      f. Choose instance [your ec2 machine] and click associate.
      g. Using this Ip address, we can call / access our machine.

   3. Connecting to instance ->
      a. Click connect.
      b. Go to - EC2 instance connect - connect.
      c. In a new window , ubuntu shall will open up.
      d. First update all packages - `sudo apt-get update`
      e. Now, by default git is installed. Can be checked by typing cokmmand git.
      f. Copy the link of your project on github and clone it here.
         `git clone https://github.com/ShivamGupta-5703/X-Backend.git`
      g. Can check using ls command.

      h. Now, we need to install node here.
         1. Install curl -> `sudo apt install -y curl`         
                         -> Curl is a client for making http request.
         2. To install nodejs -> 
            - `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -` 
            - `sudo apt install -y nodejs` 
         3. You can check by running command node and npm --version.

      i. Now, we need to load our Environment variables here.
         - `touch .env`
         
         - `vim .env`
         - press i to go to insert mode.
         - ctrl + c to paste.
         - ctrl + c -> : -> wq -> enter   [wq - write and quit]
         
         - to verify type `cat .env`
      
      j. Now, install all packages as we dont push them to github. `npm i`

      k. To generate prisma typings -> `npx prisma migrate dev`

      l. Now, we need to build our project to convert ts files to js files -> `npm run build`

      m. Now, we need to install process manager, as our server will be closed as we do ctrl+c -> `sudo npm install pm2 -g`
         - to start our server -> `pm2 start build/index.js`

         - Now, we can run our commands and check status of our running file using - `pm2 status`
         - Basically, now our file will run in background.
         - To restart your server -> `pm2 restart all`
      
      n. Now, our server is running at port 8000. So, aws will block this port. If you try using ip of your machine 13.127.9.59:8000/graphql, it will not work.
        So for this ->
          1. Go to your instance -> Security.
          2. Click on Security groups.
          3. Here, you can see Inbound rules [which ports are allowed]. You will not find 8000 here.
          4. For this, click on Edit Inbound rules -> add rule
          5. Type       - Custom TCP
             Port range - 8000
             Source     - anywhere IPv4

          6. Create one more rule for anywhere IPv6 
          7. Save rules.

   4. Configuring SSL certificate for our domain -> [because its not secure]
      a. Go to Load Balancers -> Create load balancer.
      b. Load Balancer type - Application load balancer -> Create.
      c. - Give name
         - Scheme - Internet-facing
         - Ip address - IPv4
         - Select all availability zones in Network Mapping.
         - Security Group - default[your own] and also of your current instance.
         
         - In Listening and routing ->
           1. Click create your own target group.
           2. - Target type - Instances
              - Give name
              - Leave rest default
              - Health check path - /graphql
              - click next
              - Select your instance
              - Port for the selected instances - 8000
              - click include as pending below.
              - Click craete target group.
         
         - Select the created target group
         - click create load balancer.
         - Initially it will be in provisioning state. Wait for it.
         - Once active, we can copy DNS name and append /graphql to it, it will open our server. But it is still not secure.

      d. Go to CloudFront [aws service] [It is a CDN]
         1. Create a CloudFront distribution.
         2. Origin -> Choose origin as Load Balancer we just created.
         3. Protocol -> HTTP only.
         5. Go down.
         6. Viewer protocol policy - Redirect HTTP to HTTPS
         7. Allowed HTTP methods - GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE , check Options in cache HTTP methods.
         8. Cache policy -> we need to create our own cache policy.
            a. Click create cache policy.
            b. Give a name.
            c. Headers -> Include the following headers
                       -> Add all headers except cloudfront ones and Accept-Encoders.
                          [Accept, Host, Authorization, Origin, Referer, Access-Control-Request-Method, Access-Control-Request-Headers, Accept-Charset, Accept-Language, Accept-Datetime]

            d. Query Strings - all
            e. Cookies       - all
            f. Press create.
         
         9. Select your own cache policy.
         10. Click create distribution.
         11. You will now get a Distribution Domain Name, which is the url to your server, and this time it comes with SSL cerificate.

         12. Replace the schema link in codegen.ts file and in api.ts file inside clients folder with the new Distribution Domain name.

7. *Frontend Deployment ->*
   a.Replace the schema link in codegen.ts file and in api.ts file inside clients folder with the new Distribution Domain name.
   b. Go to vercel, new project, import, add env varibales, deploy
   c. Now google oauth will not work , so add deployed project link in google cloud console credential in our project in both places.
   d. Also, we need to add domain in S3 for image uploads in cors policy.
      `
         [
             {
                 "AllowedHeaders": [
                     "*"
                 ],
                 "AllowedMethods": [
                     "GET",
                     "HEAD",
                     "PUT"
                 ],
                 "AllowedOrigins": [
                     "http://localhost:3000",
                     "https://x-frontend-ten.vercel.app"
                 ],
                 "ExposeHeaders": [],
                 "MaxAgeSeconds": 3000
             }
         ]
      `

### Successfully, deployed my own EC2 server with load balancers, target group and cloudfront distrbution. Completed deploying node server on cloud.###