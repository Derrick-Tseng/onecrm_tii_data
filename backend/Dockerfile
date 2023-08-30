# Grab the app package and create a new build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
# Let's add all the files into the app directory
WORKDIR /app

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
# DOTNET_URLS=http://+:5000
# EXPOSE 5050
ENV ASPNETCORE_URLS=http://+:5050
ENTRYPOINT ["dotnet", "backend.dll"]
