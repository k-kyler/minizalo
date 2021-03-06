using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using minizalo.Data;
using minizalo.Helpers;
using minizalo.Hubs;
using minizalo.Repositories;

namespace minizalo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Register data context
            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IDataContext>(provider => provider.GetService<DataContext>());
            // End of register data context
   
            // Register repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IInboxRepository, InboxRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IFriendRepository, FriendRepository>();
            // End of register repositories
            
            // Register helpers
            services.AddScoped<JwtService>();
            // End of register helpers

            // Add cors services
            services.AddCors();
            // End of add cors services
            
            // Add SignalR services
            services.AddSignalR();
            // End of SignalR services

            // Configuration for form data
            services.Configure<FormOptions>(options => {
                options.ValueLengthLimit = int.MaxValue;  
                options.MultipartBodyLengthLimit = int.MaxValue;  
                options.MemoryBufferThreshold = int.MaxValue;  
            });
            // End of configuration for form data
            
            services.AddControllers();
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "minizalo", Version = "v1"}); });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "minizalo v1"));
            }

            app.UseHttpsRedirection();

            // Static files
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Resources")),
                RequestPath = "/Resources"
            }); 
            // End of static files

            app.UseRouting();

            // Global cors policy
            app.UseCors(options => options
                .WithOrigins(new []{"http://localhost:3000"})
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader());
            // End of global cors policy

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // Add endpoints of hubs
                endpoints.MapHub<ChatHub>("/hubs/chat");
                // End of endpoints of hubs
            });
        }
    }
}