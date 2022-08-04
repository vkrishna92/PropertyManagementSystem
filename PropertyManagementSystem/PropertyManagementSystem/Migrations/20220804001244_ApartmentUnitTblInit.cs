using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PropertyManagementSystem.Migrations
{
    public partial class ApartmentUnitTblInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApartmentUnits",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDateTime = table.Column<DateTime>(nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    UnitNumber = table.Column<string>(nullable: false),
                    FloorNumber = table.Column<string>(nullable: false),
                    BuildingNumber = table.Column<string>(nullable: false),
                    OwnerId = table.Column<string>(nullable: true),
                    ResidentId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApartmentUnits_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApartmentUnits_AspNetUsers_ResidentId",
                        column: x => x.ResidentId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnits_OwnerId",
                table: "ApartmentUnits",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentUnits_ResidentId",
                table: "ApartmentUnits",
                column: "ResidentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApartmentUnits");
        }
    }
}
