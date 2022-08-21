using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class apartmentTblFKUserIdBuildingId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Apartments_Communities_CommunityId",
                table: "Apartments");

            migrationBuilder.DropIndex(
                name: "IX_Apartments_CommunityId",
                table: "Apartments");

            migrationBuilder.DropColumn(
                name: "CommunityId",
                table: "Apartments");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Apartments",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "BuildingId",
                table: "Apartments",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Apartments_AppUserId",
                table: "Apartments",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartments_BuildingId",
                table: "Apartments",
                column: "BuildingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Apartments_AspNetUsers_AppUserId",
                table: "Apartments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Apartments_Buildings_BuildingId",
                table: "Apartments",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Apartments_AspNetUsers_AppUserId",
                table: "Apartments");

            migrationBuilder.DropForeignKey(
                name: "FK_Apartments_Buildings_BuildingId",
                table: "Apartments");

            migrationBuilder.DropIndex(
                name: "IX_Apartments_AppUserId",
                table: "Apartments");

            migrationBuilder.DropIndex(
                name: "IX_Apartments_BuildingId",
                table: "Apartments");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Apartments");

            migrationBuilder.DropColumn(
                name: "BuildingId",
                table: "Apartments");

            migrationBuilder.AddColumn<long>(
                name: "CommunityId",
                table: "Apartments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Apartments_CommunityId",
                table: "Apartments",
                column: "CommunityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Apartments_Communities_CommunityId",
                table: "Apartments",
                column: "CommunityId",
                principalTable: "Communities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
