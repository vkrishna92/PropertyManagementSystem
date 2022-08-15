using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class RentPaymHistoryTblInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RentPaymHistorys",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDateTime = table.Column<DateTime>(nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    RentScheduleId = table.Column<long>(nullable: false),
                    TransDate = table.Column<DateTime>(nullable: false),
                    AmountPaid = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentPaymHistorys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentPaymHistorys_RentSchedules_RentScheduleId",
                        column: x => x.RentScheduleId,
                        principalTable: "RentSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RentPaymHistorys_RentScheduleId",
                table: "RentPaymHistorys",
                column: "RentScheduleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RentPaymHistorys");
        }
    }
}
