#!/bin/bash
HOST_DIR=~/OneCrm

docker run --rm -v $HOST_DIR:/home -w /home mcr.microsoft.com/dotnet/aspnet dotnet watch --no-hot-reload