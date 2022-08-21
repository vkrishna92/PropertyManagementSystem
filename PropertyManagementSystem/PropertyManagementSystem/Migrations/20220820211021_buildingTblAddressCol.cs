using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class buildingTblAddressCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AddressLine1",
                table: "Buildings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressLine2",
                table: "Buildings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Buildings",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Buildings",
                maxLength: 60,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Buildings",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "UseCommunityAddress",
                table: "Buildings",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Zipcode",
                table: "Buildings",
                maxLength: 10,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLine1",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "AddressLine2",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "UseCommunityAddress",
                table: "Buildings");

            migrationBuilder.DropColumn(
                name: "Zipcode",
                table: "Buildings");
        }
    }
}
