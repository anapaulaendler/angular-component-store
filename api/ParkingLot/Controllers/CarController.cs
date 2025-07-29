using ParkingLot.Data;
using ParkingLot.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ParkingLot.Controllers;

[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CarsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Car>> AddCar(Car car)
    {
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCars), new { id = car.Id }, car);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Car>>> GetCars() =>
        await _context.Cars.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Car>> GetCar(Guid id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car is null) return NotFound();

        return car;
    }

    [HttpGet("plate/{plate}")]
    public async Task<ActionResult<Car>> GetCarByPlate(string plate)
    {
        var car = await _context.Cars.FirstOrDefaultAsync(x => x.Plate == plate);
        if (car is null) return NotFound();

        return car;
    }
        
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCar(Guid id, Car car)
    {
        if (id != car.Id) return BadRequest();

        _context.Entry(car).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar(Guid id)
    {
        var Car = await _context.Cars.FindAsync(id);
        if (Car is null) return NotFound();

        _context.Cars.Remove(Car);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}