using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class ApartmentUnitResidentMapInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApartmentUnitResidentMaps",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDateTime = table.Column<DateTime>(nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    ApartmentUnitId = table.Column<long>(nullable: true),
                    ResidentId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentUnitResidentMaps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApartmentUnitResidentMaps_ApartmentUnits_ApartmentUnitId",
                        column: x => x.ApartmentUnitId,
                        principalTable: "ApartmentUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApartmentUnitResidentMaps_AspNetUsers_ResidentId",
                        column: x => x.ResidentId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnitResidentMaps_ApartmentUnitId",
                table: "ApartmentUnitResidentMaps",
                column: "ApartmentUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnitResidentMaps_ResidentId",
                table: "ApartmentUnitResidentMaps",
                column: "ResidentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApartmentUnitResidentMaps");
        }
    }
}
