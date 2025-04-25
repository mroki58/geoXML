using azureWebAPI.Services;
using azureWebAPI.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAddService, AddService>();
builder.Services.AddScoped<IDeleteService, DeleteService>();

builder.Services.AddSingleton<AzureDbContext>();
builder.Services.AddControllers(); 

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowSpecificOrigins", policy =>
//     {
//         policy.WithOrigins("https://example.com", "https://anotherdomain.com") 
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });


var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers(); // Mapuje kontrolery

app.Run();