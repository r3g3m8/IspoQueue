using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IspoQueue.DAL.Migrations
{
    /// <inheritdoc />
    public partial class LazyLoading : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServicesToRoles_Services_ServiceId1",
                table: "ServicesToRoles");

            migrationBuilder.DropIndex(
                name: "IX_ServicesToRoles_ServiceId1",
                table: "ServicesToRoles");

            migrationBuilder.DropColumn(
                name: "ServiceId1",
                table: "ServicesToRoles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceId1",
                table: "ServicesToRoles",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServicesToRoles_ServiceId1",
                table: "ServicesToRoles",
                column: "ServiceId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ServicesToRoles_Services_ServiceId1",
                table: "ServicesToRoles",
                column: "ServiceId1",
                principalTable: "Services",
                principalColumn: "Id");
        }
    }
}
