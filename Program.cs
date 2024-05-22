using IspoQueue.App.Repositories;
using IspoQueue.DAL;
using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
var connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["DatabaseUrl"];

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://localhost:44447/");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

builder.Services.AddScoped<IGenericRepo<Queue>, GenericRepo<Queue>>();
builder.Services.AddScoped<IGenericRepo<Service>, GenericRepo<Service>>();
builder.Services.AddScoped<IGenericRepo<UserToRole>, GenericRepo<UserToRole>>();
builder.Services.AddScoped<IGenericRepo<Role>, GenericRepo<Role>>();
builder.Services.AddScoped<IGenericRepo<ServiceToRole>, GenericRepo<ServiceToRole>>();
builder.Services.AddScoped<IGenericRepo<UserToWindow>, GenericRepo<UserToWindow>>();
builder.Services.AddScoped<IGenericRepo<Window>, GenericRepo<Window>>();
builder.Services.AddScoped<IGenericRepo<Status>, GenericRepo<Status>>();
builder.Services.AddScoped<IGenericRepo<User>, GenericRepo<User>>();
builder.Services.AddScoped<IGenericRepo<Cabinet>, GenericRepo<Cabinet>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
