using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IspoQueue.DAL.Migrations
{
    /// <inheritdoc />
    public partial class IEnumerable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Queue_Status_StatusId",
                table: "Queue");

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Queue",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Queue_Status_StatusId",
                table: "Queue",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Queue_Status_StatusId",
                table: "Queue");

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Queue",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Queue_Status_StatusId",
                table: "Queue",
                column: "StatusId",
                principalTable: "Status",
                principalColumn: "Id");
        }
    }
}
