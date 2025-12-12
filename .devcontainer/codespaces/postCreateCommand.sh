
until docker info >/dev/null 2>&1; do sleep 1; done
docker rm postgres >/dev/null 2>&1
docker run -d -i --name postgres -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres
until docker exec postgres pg_isready -U postgres; do sleep 1; done

./bin/setup
./bin/setup
RAILS_ENV=test bundle exec rake db:setup dev:prime

echo "" >> .env && echo "DATABASE_URL=postgresql://postgres:@localhost" >> .env

docker stop postgres
