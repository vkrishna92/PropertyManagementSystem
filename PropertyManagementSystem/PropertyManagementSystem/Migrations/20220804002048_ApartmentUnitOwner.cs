using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class ApartmentUnitOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "ApartmentUnits",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnits_OwnerId",
                table: "ApartmentUnits",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApartmentUnits_AspNetUsers_OwnerId",
                table: "ApartmentUnits",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApartmentUnits_AspNetUsers_OwnerId",
                table: "ApartmentUnits");

            migrationBuilder.DropIndex(
                name: "IX_ApartmentUnits_OwnerId",
                table: "ApartmentUnits");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "ApartmentUnits");
        }
    }
}
