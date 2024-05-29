using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IspoQueue.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Windows",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Status",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Roles",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Cabinets",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("21bd063c-514f-4cdc-832e-6df81bf66231"), "Оператор-секретарь" },
                    { new Guid("34b1956d-b8ae-4003-bf08-a78ec7178e12"), "Оператор-координатор" },
                    { new Guid("350788fc-8773-4fec-bb0d-4efe35a6bf66"), "Оператор-модератор" },
                    { new Guid("37439009-a764-4d41-ad72-80e321b08d05"), "Дисплей" },
                    { new Guid("456321a9-e5e9-4743-b127-6bb4bb565960"), "Терминал" },
                    { new Guid("773e52d5-29bb-4f0f-b9f0-a946f321f565"), "Оператор-консультант приоритетов" },
                    { new Guid("77604ee0-83ff-4d12-9989-0ff95b1d5c02"), "Оператор-консультант" },
                    { new Guid("cc31abba-9b93-40e9-96e5-c18ecd54565f"), "Администратор" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "IdentityStr", "Name", "QueueName" },
                values: new object[,]
                {
                    { 1, "З", "Заполнение заявления в Личном кабинете абитуриента", "Подача документов" },
                    { 2, "О", "Оформление личного дела абитуриента", "Подача документов" },
                    { 3, "К", "Консультация по выбору специальностей", "Консультации" },
                    { 4, "П", "Изменение приоритетов", "Консультации" },
                    { 5, "Д", "Прием оригиналов документов об образовании/Выдача документов", "Прием оригиналов документов об образовании/Выдача документов" }
                });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "В ожидании" },
                    { 2, "Активен" },
                    { 3, "Завершен" },
                    { 4, "Отложен" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "Login", "PasswordHash", "SecondName" },
                values: new object[] { new Guid("68041dff-c7dc-4f26-a4f0-efb852e62576"), null, "admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", null });

            migrationBuilder.InsertData(
                table: "ServicesToRoles",
                columns: new[] { "Id", "RoleId", "ServiceId" },
                values: new object[,]
                {
                    { new Guid("17e7d1e2-8a4d-4270-87bd-f39ff010e549"), new Guid("773e52d5-29bb-4f0f-b9f0-a946f321f565"), 4 },
                    { new Guid("3637a194-0d9a-4c43-8614-8d91bb5b441d"), new Guid("77604ee0-83ff-4d12-9989-0ff95b1d5c02"), 3 },
                    { new Guid("399b1110-ea98-41d0-b536-49bee9196e24"), new Guid("34b1956d-b8ae-4003-bf08-a78ec7178e12"), 1 },
                    { new Guid("71c3d492-03a6-448b-adc3-00471b9cff31"), new Guid("350788fc-8773-4fec-bb0d-4efe35a6bf66"), 2 },
                    { new Guid("a23c9c8f-8947-4694-a6d3-a29c527e7218"), new Guid("21bd063c-514f-4cdc-832e-6df81bf66231"), 5 }
                });

            migrationBuilder.InsertData(
                table: "UserToRoles",
                columns: new[] { "Id", "RoleId", "UserId" },
                values: new object[] { new Guid("c864ecff-49dd-4c81-8ae3-0663ba8ff078"), new Guid("cc31abba-9b93-40e9-96e5-c18ecd54565f"), new Guid("68041dff-c7dc-4f26-a4f0-efb852e62576") });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("37439009-a764-4d41-ad72-80e321b08d05"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("456321a9-e5e9-4743-b127-6bb4bb565960"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("17e7d1e2-8a4d-4270-87bd-f39ff010e549"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("3637a194-0d9a-4c43-8614-8d91bb5b441d"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("399b1110-ea98-41d0-b536-49bee9196e24"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("71c3d492-03a6-448b-adc3-00471b9cff31"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("a23c9c8f-8947-4694-a6d3-a29c527e7218"));

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Status",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("c864ecff-49dd-4c81-8ae3-0663ba8ff078"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("21bd063c-514f-4cdc-832e-6df81bf66231"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("34b1956d-b8ae-4003-bf08-a78ec7178e12"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("350788fc-8773-4fec-bb0d-4efe35a6bf66"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("773e52d5-29bb-4f0f-b9f0-a946f321f565"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("77604ee0-83ff-4d12-9989-0ff95b1d5c02"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("cc31abba-9b93-40e9-96e5-c18ecd54565f"));

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("68041dff-c7dc-4f26-a4f0-efb852e62576"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Windows",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Status",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Roles",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Cabinets",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
