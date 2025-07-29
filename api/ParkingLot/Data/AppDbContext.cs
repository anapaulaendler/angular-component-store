using ParkingLot.Entities;
using Microsoft.EntityFrameworkCore;

namespace ParkingLot.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Car> Cars => Set<Car>();
}