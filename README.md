# galvanize-group-project-2

App is deployed to https://galvanize-tasker-app.azurewebsites.net/ but it is not always online.

Windows users should run the following command before cloning if they have never run it before `git config --global core.autocrlf input`

From the project's root directory run `docker-compose build` and then `docker-compose up`.

Unix users may need to run `chmod +x entrypoint.sh` from within the frontend directory.

The app will then be found at http://localhost for docker/docker desktop users or http://192.168.99.100 for docker toolbox users.
