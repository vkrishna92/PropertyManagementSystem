using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class ApartmentUnitRemoveUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApartmentUnits_AspNetUsers_OwnerId",
                table: "ApartmentUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_ApartmentUnits_AspNetUsers_ResidentId",
                table: "ApartmentUnits");

            migrationBuilder.DropIndex(
                name: "IX_ApartmentUnits_OwnerId",
                table: "ApartmentUnits");

            migrationBuilder.DropIndex(
                name: "IX_ApartmentUnits_ResidentId",
                table: "ApartmentUnits");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "ApartmentUnits");

            migrationBuilder.DropColumn(
                name: "ResidentId",
                table: "ApartmentUnits");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "ApartmentUnits",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResidentId",
                table: "ApartmentUnits",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnits_OwnerId",
                table: "ApartmentUnits",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnits_ResidentId",
                table: "ApartmentUnits",
                column: "ResidentId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApartmentUnits_AspNetUsers_OwnerId",
                table: "ApartmentUnits",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ApartmentUnits_AspNetUsers_ResidentId",
                table: "ApartmentUnits",
                column: "ResidentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
