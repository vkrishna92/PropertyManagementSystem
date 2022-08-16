using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class RentScheduleRemoveAppUserApartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentSchedules_Apartments_ApartmentId1",
                table: "RentSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_RentSchedules_AspNetUsers_AppUserId",
                table: "RentSchedules");

            migrationBuilder.DropIndex(
                name: "IX_RentSchedules_ApartmentId1",
                table: "RentSchedules");

            migrationBuilder.DropIndex(
                name: "IX_RentSchedules_AppUserId",
                table: "RentSchedules");

            migrationBuilder.DropColumn(
                name: "ApartmentId",
                table: "RentSchedules");

            migrationBuilder.DropColumn(
                name: "ApartmentId1",
                table: "RentSchedules");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "RentSchedules");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApartmentId",
                table: "RentSchedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "ApartmentId1",
                table: "RentSchedules",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "RentSchedules",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RentSchedules_ApartmentId1",
                table: "RentSchedules",
                column: "ApartmentId1");

            migrationBuilder.CreateIndex(
                name: "IX_RentSchedules_AppUserId",
                table: "RentSchedules",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentSchedules_Apartments_ApartmentId1",
                table: "RentSchedules",
                column: "ApartmentId1",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RentSchedules_AspNetUsers_AppUserId",
                table: "RentSchedules",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
