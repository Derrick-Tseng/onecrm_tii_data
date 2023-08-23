using System;
using System.Collections.Immutable;
using System.ComponentModel;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>{
    opt.AddPolicy("CorsPolicy", policy=>{
        policy.AllowAnyHeader().AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5000");
    });
});

builder.Services.AddDbContext<postgresContext>(options =>{
    options.UseNpgsql(builder.Configuration.GetConnectionString("postgres"));
});

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseSession();
app.Use(async (context, next) =>
{
    context.Session.SetString("dataPerPpage","dataPerPageValue");
    await next.Invoke();
});

app.UseCors("CorsPolicy");

app.Run();
