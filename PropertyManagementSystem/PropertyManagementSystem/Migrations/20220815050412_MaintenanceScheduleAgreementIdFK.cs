using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class MaintenanceScheduleAgreementIdFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceSchedules_Apartments_ApartmentId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceSchedules_AspNetUsers_AppUserId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceSchedules_ApartmentId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceSchedules_AppUserId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropColumn(
                name: "ApartmentId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "MaintenanceSchedules");

            migrationBuilder.AddColumn<long>(
                name: "MaintenanceAgreementId",
                table: "MaintenanceSchedules",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceSchedules_MaintenanceAgreementId",
                table: "MaintenanceSchedules",
                column: "MaintenanceAgreementId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceSchedules_MaintenanceAgreements_MaintenanceAgreementId",
                table: "MaintenanceSchedules",
                column: "MaintenanceAgreementId",
                principalTable: "MaintenanceAgreements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MaintenanceSchedules_MaintenanceAgreements_MaintenanceAgreementId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropIndex(
                name: "IX_MaintenanceSchedules_MaintenanceAgreementId",
                table: "MaintenanceSchedules");

            migrationBuilder.DropColumn(
                name: "MaintenanceAgreementId",
                table: "MaintenanceSchedules");

            migrationBuilder.AddColumn<long>(
                name: "ApartmentId",
                table: "MaintenanceSchedules",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "MaintenanceSchedules",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceSchedules_ApartmentId",
                table: "MaintenanceSchedules",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceSchedules_AppUserId",
                table: "MaintenanceSchedules",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceSchedules_Apartments_ApartmentId",
                table: "MaintenanceSchedules",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaintenanceSchedules_AspNetUsers_AppUserId",
                table: "MaintenanceSchedules",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
