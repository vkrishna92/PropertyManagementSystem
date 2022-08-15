using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class MaintenancePaymHistoryTblInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaintenancePaymHistories",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDateTime = table.Column<DateTime>(nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    MaintenanceScheduleId = table.Column<int>(nullable: false),
                    MaintenanceScheduleId1 = table.Column<long>(nullable: true),
                    TransDate = table.Column<DateTime>(nullable: false),
                    AmountPaid = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenancePaymHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaintenancePaymHistories_MaintenanceSchedules_MaintenanceScheduleId1",
                        column: x => x.MaintenanceScheduleId1,
                        principalTable: "MaintenanceSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaintenancePaymHistories_MaintenanceScheduleId1",
                table: "MaintenancePaymHistories",
                column: "MaintenanceScheduleId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaintenancePaymHistories");
        }
    }
}
