
until docker info >/dev/null 2>&1; do sleep 1; done
docker rm postgres >/dev/null 2>&1
docker run -d -i --name postgres -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres
until docker exec postgres pg_isready -U postgres; do sleep 1; done

# Create config/database.yml
./bin/setup
# Setup &  Create .env
./bin/setup

# Create test database and run seeds
RAILS_ENV=test ./bin/rails dev:prime

docker stop postgres
