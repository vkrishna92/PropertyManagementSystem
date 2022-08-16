using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class RentScheduleAgreementIdFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "RentAgreementId",
                table: "RentSchedules",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_RentSchedules_RentAgreementId",
                table: "RentSchedules",
                column: "RentAgreementId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentSchedules_RentAgreements_RentAgreementId",
                table: "RentSchedules",
                column: "RentAgreementId",
                principalTable: "RentAgreements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentSchedules_RentAgreements_RentAgreementId",
                table: "RentSchedules");

            migrationBuilder.DropIndex(
                name: "IX_RentSchedules_RentAgreementId",
                table: "RentSchedules");

            migrationBuilder.DropColumn(
                name: "RentAgreementId",
                table: "RentSchedules");
        }
    }
}
