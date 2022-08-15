using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class RentSchedulesTblInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RentSchedules",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDateTime = table.Column<DateTime>(nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    ApartmentId = table.Column<int>(nullable: false),
                    ApartmentId1 = table.Column<long>(nullable: true),
                    AppUserId = table.Column<string>(nullable: true),
                    Description = table.Column<string>(maxLength: 50, nullable: true),
                    PeriodStartDate = table.Column<DateTime>(nullable: false),
                    PeriodEndDate = table.Column<DateTime>(nullable: false),
                    RentAmount = table.Column<float>(nullable: false),
                    MaintenanceAmount = table.Column<float>(nullable: false),
                    TotalAmount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentSchedules_Apartments_ApartmentId1",
                        column: x => x.ApartmentId1,
                        principalTable: "Apartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RentSchedules_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RentSchedules_ApartmentId1",
                table: "RentSchedules",
                column: "ApartmentId1");

            migrationBuilder.CreateIndex(
                name: "IX_RentSchedules_AppUserId",
                table: "RentSchedules",
                column: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RentSchedules");
        }
    }
}
