# Project Installation

The first step is to clone the repository with the command below:

```shell
git clone https://github.com/BrianXJ6/template.git
```

After cloning the repository, navigate to its dependencies and in the root you'll find a file called `.env.example`, Make a copy of this file named `.env`, this is the main configuration file of the application.

> If you wish, you can create several files for different environments such as testing, production, etc., just copy the example and change the suffix.<br> Example: `.env.testing` for a testing environment, `.env.production` for a production environment, and so on...

For convenience, below is a simple example command to copy your environment file.

```shell
cp .env.example .env
```

Now let's install all application packages and dependencies with Composer. Run the command below:

```shell
composer update
```

With Composer installed, we now have access to Laravel Artisan commands, and before anything else, we need to generate a key for our application. See the command below:

```shell
php artisan key:generate
```

Now you have 2 paths to follow:

1. Take advantage of all the facilities of Laravel Sail to have a fully Dockerized environment;
2. Run the application service with a local server without the need to start a Docker container.

As usual, the best and easiest option is to use Laravel Sail (Docker), as it will provide you with a fully configured environment with all the necessary services for the proper functioning of the application. However, nothing prevents you from running only the services that are convenient for you separately and starting your server locally if you already have everything ready.

Currently, the application uses **5 services**, of which **2 are mandatory** and 3 optional in a development environment. The list of services is as follows:

Mandatory Services:

- MySQL
- Redis

Optional Services:

- Minio
- Soketi
- Application (Container com imagem do PHP)

## Docker

As mentioned earlier, it is recommended to use Laravel Sail (Docker) to facilitate all the work. It is optional but highly recommended to create an `alias` for Sail commands. In the root of the project, run:

```shell
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

> You can also create a permanent alias pointing to the `vendor/` directory.

Now we can execute any Sail command more easily, just run `sail {command}` and watch the magic happen.

> Remember that Sail will only be available after running Composer!

Without the alias, to use Sail you would need to specify the entire path to the executor, like this: `./vendor/bin/sail {command}`, which can become tedious over time.

Finally, we can bring up all services in a container with the command below:

```shell
sail up -d
```

> If you want to force a new build of your container, just add the `--build` flag.

Now you can enjoy all the ease of Sail and execute Artisan commands within your application container without needing to access it. For example, to generate a new application key, just run:

```shell
sail a key:generate
```

The container is already prepared to create an initial build and run the migrations, so it will not be necessary to perform these steps manually. Other services like queues and SSR are also automatically started with the help of the supervisor.

For more information, see: [Laravel Sail](https://laravel.com/docs/11.x/sail)

To take down all services, just run the command below:

```shell
sail down
```

> If you want to remove all generated volumes, use the `-v` flag at the end.

## Local Server

Now let's see how to use it without Docker...<br>
For convenience, much of the heavy lifting is already done. Review the `docker-compose.yml` file; with it, you can bring up only the MySQL and Redis services like this:

```shell
docker compose up -d mysql redis
```

> If you want to include more services, just add the name of the desired service at the end.

With the services running, let's run the migrations and populate our database:

```shell
php artisan migrate --seed
```

It will also be necessary to download the NPM packages:

```shell
npm i
```

And with the help of Vite, compile in runtime working with auto reload for our frontend:

```shell
npm run dev
```

> If you want a build for production, run: `npm run build`. Remember that the `run dev` command will occupy your terminal, so you will need to use a new tab.

After that, just run a local PHP server on your machine with the command below:

```shell
php -S 0.0.0.0:80 -t public
```

> Don't forget to configure your `.env` file so that connections with the services can work correctly.

Use Artisan commands to perform other functions like starting queue jobs, cache cleaning, etc.
