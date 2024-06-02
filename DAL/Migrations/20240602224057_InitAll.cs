using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IspoQueue.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitAll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("68041dff-c7dc-4f26-a4f0-efb852e62576"));

            migrationBuilder.InsertData(
                table: "Cabinets",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("35153787-5403-4a4e-a645-d3a254c6d153"), "113" },
                    { new Guid("586c3e9d-870f-4242-b985-37f6b146360d"), "110" },
                    { new Guid("8dce902d-483c-4a90-8541-4c9da65ae723"), "115" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("0bbf7940-2792-4a8e-bdd8-8cb25dbe83d3"), "Администратор" },
                    { new Guid("3aa7f4c3-f11c-4cd6-9651-161f29ddf40e"), "Оператор-секретарь" },
                    { new Guid("4c0eea7d-bb41-4a4d-b365-1be165c1aaa4"), "Оператор-консультант" },
                    { new Guid("59a08df2-43ad-47d5-bec0-9c4e1a36a4a0"), "Терминал" },
                    { new Guid("6a2f9903-d519-4d6a-9862-d69a3efe4d07"), "Оператор-координатор" },
                    { new Guid("858e5a7f-434b-4172-a51e-0b427d36b30d"), "Оператор-консультант приоритетов" },
                    { new Guid("99becfd1-2829-4d21-b953-db96570e7056"), "Дисплей" },
                    { new Guid("e15b6623-69c6-4292-b190-76c83bd3e80f"), "Оператор-модератор" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "Login", "PasswordHash", "SecondName" },
                values: new object[,]
                {
                    { new Guid("0149e056-cdb6-44db-82d0-4a486f831fc2"), "Иван", "admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "Иванов" },
                    { new Guid("04ff2673-3e50-4bd7-942a-2758df8b4f35"), "Ольга", "oper2", "633877dd80cc1d37cf127d6ada0f66c0e11b98743c22439d2e66f39c66e699b4", "Сидорова" },
                    { new Guid("74c55983-709b-4d7e-8f23-8fc54611f620"), null, "display", "dfbb889cf19bda82ed8deadf82de232979aa4ecc83238625c6453dc4c597b43a", null },
                    { new Guid("7d51ab8d-d815-4957-8a59-3aaee43cebfe"), null, "terminal", "4e686af7bdcc5ae005a247624fd8c7283257c2514f6b3ad2ff5d4cb6d95196e6", null },
                    { new Guid("81eed72f-50a3-4dc9-a2aa-bd35f7af66ba"), "Мария", "oper3", "ceaaa4703e1fa8765f452535a52073c32953e630e4bef8db45a238d2017ae421", "Кузнецова" },
                    { new Guid("c64a45e7-3527-410b-a0fa-ff602cb83cba"), "Елена", "oper4", "f53a77faffc92cad68ad596386d86c25d878a15e3fd62b9f4063526a7b5ebdcd", "Попова" },
                    { new Guid("f20f37d8-af92-4104-b594-51a64ab7a921"), "Петр", "oper1", "4d71683ca038b374b94e1afc2a4c1ec8bf83e6d4ca52cb8f5e3ac702625df36c", "Петров" },
                    { new Guid("fe092868-637a-455e-b997-500b98359d2b"), "Татьяна", "oper5", "d971b2d8d3a10e1c969d7da50b9917baad2ba4989cfbd8c371f1fc0c06674496", "Сидорова" }
                });

            migrationBuilder.InsertData(
                table: "ServicesToRoles",
                columns: new[] { "Id", "RoleId", "ServiceId" },
                values: new object[,]
                {
                    { new Guid("31e3cfd3-db6c-498f-9c6d-efff7b1034be"), new Guid("4c0eea7d-bb41-4a4d-b365-1be165c1aaa4"), 3 },
                    { new Guid("7715417a-f61a-425a-b7cf-b5a1c6cb4db8"), new Guid("3aa7f4c3-f11c-4cd6-9651-161f29ddf40e"), 5 },
                    { new Guid("cd975651-865b-49fc-bc5e-f44b75751914"), new Guid("e15b6623-69c6-4292-b190-76c83bd3e80f"), 2 },
                    { new Guid("df265716-5f02-4bf3-abd9-5e567a092cad"), new Guid("6a2f9903-d519-4d6a-9862-d69a3efe4d07"), 1 },
                    { new Guid("f251caa0-befe-40cb-888a-f01c917158f3"), new Guid("858e5a7f-434b-4172-a51e-0b427d36b30d"), 4 }
                });

            migrationBuilder.InsertData(
                table: "UserToRoles",
                columns: new[] { "Id", "RoleId", "UserId" },
                values: new object[,]
                {
                    { new Guid("036d429c-1934-4dba-b1e9-d308d817d4b3"), new Guid("3aa7f4c3-f11c-4cd6-9651-161f29ddf40e"), new Guid("fe092868-637a-455e-b997-500b98359d2b") },
                    { new Guid("3546666e-c224-4158-88f6-f928c62e0d7f"), new Guid("0bbf7940-2792-4a8e-bdd8-8cb25dbe83d3"), new Guid("0149e056-cdb6-44db-82d0-4a486f831fc2") },
                    { new Guid("47bf2861-93f6-4cb2-af8d-ab77a7f09ce4"), new Guid("59a08df2-43ad-47d5-bec0-9c4e1a36a4a0"), new Guid("7d51ab8d-d815-4957-8a59-3aaee43cebfe") },
                    { new Guid("4a42e547-ef34-474f-844e-9d1f12e9be93"), new Guid("99becfd1-2829-4d21-b953-db96570e7056"), new Guid("74c55983-709b-4d7e-8f23-8fc54611f620") },
                    { new Guid("8205a469-e7cd-49a6-ac7a-22c72d145613"), new Guid("4c0eea7d-bb41-4a4d-b365-1be165c1aaa4"), new Guid("81eed72f-50a3-4dc9-a2aa-bd35f7af66ba") },
                    { new Guid("917f6fbf-4506-4ac0-aeb3-01b0578fa0c9"), new Guid("858e5a7f-434b-4172-a51e-0b427d36b30d"), new Guid("c64a45e7-3527-410b-a0fa-ff602cb83cba") },
                    { new Guid("e8bf576c-6a76-4a31-9a24-9e02fecfefd8"), new Guid("e15b6623-69c6-4292-b190-76c83bd3e80f"), new Guid("04ff2673-3e50-4bd7-942a-2758df8b4f35") },
                    { new Guid("f61193f4-b67b-40c2-a378-1c862ec1156a"), new Guid("6a2f9903-d519-4d6a-9862-d69a3efe4d07"), new Guid("f20f37d8-af92-4104-b594-51a64ab7a921") }
                });

            migrationBuilder.InsertData(
                table: "Windows",
                columns: new[] { "Id", "CabinetId", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("296f45b2-042c-43f7-b072-1069b814c821"), new Guid("8dce902d-483c-4a90-8541-4c9da65ae723"), true, "1" },
                    { new Guid("3504fb37-a833-4f51-9635-9a3fa2dcacc8"), new Guid("586c3e9d-870f-4242-b985-37f6b146360d"), true, "3" },
                    { new Guid("86b260d0-e6f0-400e-949d-ce14e3d8ec24"), new Guid("586c3e9d-870f-4242-b985-37f6b146360d"), true, "1" },
                    { new Guid("a1e38c1a-cc2e-426f-aa4c-018c43134135"), new Guid("586c3e9d-870f-4242-b985-37f6b146360d"), true, "4" },
                    { new Guid("b987028e-94ee-469c-8510-24fce1404434"), new Guid("35153787-5403-4a4e-a645-d3a254c6d153"), true, "1" },
                    { new Guid("ce96b024-dfee-4fed-a4b5-ee430d40ef64"), new Guid("8dce902d-483c-4a90-8541-4c9da65ae723"), true, "2" },
                    { new Guid("e83b153a-7e39-4b34-9989-b0b4b8bbe441"), new Guid("586c3e9d-870f-4242-b985-37f6b146360d"), false, "2" }
                });

            migrationBuilder.InsertData(
                table: "UserToWindows",
                columns: new[] { "Id", "UserId", "WindowId" },
                values: new object[,]
                {
                    { new Guid("1466bc71-76a6-4f79-8ea0-71b2a6836ed0"), new Guid("04ff2673-3e50-4bd7-942a-2758df8b4f35"), new Guid("e83b153a-7e39-4b34-9989-b0b4b8bbe441") },
                    { new Guid("6d81ba48-e2de-4538-bf6c-1923873e5ed9"), new Guid("81eed72f-50a3-4dc9-a2aa-bd35f7af66ba"), new Guid("b987028e-94ee-469c-8510-24fce1404434") },
                    { new Guid("aa059598-b93e-4ca9-9e15-be38b7973b54"), new Guid("c64a45e7-3527-410b-a0fa-ff602cb83cba"), new Guid("3504fb37-a833-4f51-9635-9a3fa2dcacc8") },
                    { new Guid("f79a8093-1d65-4a72-910a-48d2099f6230"), new Guid("f20f37d8-af92-4104-b594-51a64ab7a921"), new Guid("86b260d0-e6f0-400e-949d-ce14e3d8ec24") },
                    { new Guid("fdff3c50-db42-48ed-9a28-9215c97383a1"), new Guid("fe092868-637a-455e-b997-500b98359d2b"), new Guid("296f45b2-042c-43f7-b072-1069b814c821") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("31e3cfd3-db6c-498f-9c6d-efff7b1034be"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("7715417a-f61a-425a-b7cf-b5a1c6cb4db8"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("cd975651-865b-49fc-bc5e-f44b75751914"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("df265716-5f02-4bf3-abd9-5e567a092cad"));

            migrationBuilder.DeleteData(
                table: "ServicesToRoles",
                keyColumn: "Id",
                keyValue: new Guid("f251caa0-befe-40cb-888a-f01c917158f3"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("036d429c-1934-4dba-b1e9-d308d817d4b3"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("3546666e-c224-4158-88f6-f928c62e0d7f"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("47bf2861-93f6-4cb2-af8d-ab77a7f09ce4"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("4a42e547-ef34-474f-844e-9d1f12e9be93"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("8205a469-e7cd-49a6-ac7a-22c72d145613"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("917f6fbf-4506-4ac0-aeb3-01b0578fa0c9"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("e8bf576c-6a76-4a31-9a24-9e02fecfefd8"));

            migrationBuilder.DeleteData(
                table: "UserToRoles",
                keyColumn: "Id",
                keyValue: new Guid("f61193f4-b67b-40c2-a378-1c862ec1156a"));

            migrationBuilder.DeleteData(
                table: "UserToWindows",
                keyColumn: "Id",
                keyValue: new Guid("1466bc71-76a6-4f79-8ea0-71b2a6836ed0"));

            migrationBuilder.DeleteData(
                table: "UserToWindows",
                keyColumn: "Id",
                keyValue: new Guid("6d81ba48-e2de-4538-bf6c-1923873e5ed9"));

            migrationBuilder.DeleteData(
                table: "UserToWindows",
                keyColumn: "Id",
                keyValue: new Guid("aa059598-b93e-4ca9-9e15-be38b7973b54"));

            migrationBuilder.DeleteData(
                table: "UserToWindows",
                keyColumn: "Id",
                keyValue: new Guid("f79a8093-1d65-4a72-910a-48d2099f6230"));

            migrationBuilder.DeleteData(
                table: "UserToWindows",
                keyColumn: "Id",
                keyValue: new Guid("fdff3c50-db42-48ed-9a28-9215c97383a1"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("a1e38c1a-cc2e-426f-aa4c-018c43134135"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("ce96b024-dfee-4fed-a4b5-ee430d40ef64"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("0bbf7940-2792-4a8e-bdd8-8cb25dbe83d3"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("3aa7f4c3-f11c-4cd6-9651-161f29ddf40e"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("4c0eea7d-bb41-4a4d-b365-1be165c1aaa4"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("59a08df2-43ad-47d5-bec0-9c4e1a36a4a0"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6a2f9903-d519-4d6a-9862-d69a3efe4d07"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("858e5a7f-434b-4172-a51e-0b427d36b30d"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("99becfd1-2829-4d21-b953-db96570e7056"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("e15b6623-69c6-4292-b190-76c83bd3e80f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("0149e056-cdb6-44db-82d0-4a486f831fc2"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("04ff2673-3e50-4bd7-942a-2758df8b4f35"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("74c55983-709b-4d7e-8f23-8fc54611f620"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7d51ab8d-d815-4957-8a59-3aaee43cebfe"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("81eed72f-50a3-4dc9-a2aa-bd35f7af66ba"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("c64a45e7-3527-410b-a0fa-ff602cb83cba"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("f20f37d8-af92-4104-b594-51a64ab7a921"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("fe092868-637a-455e-b997-500b98359d2b"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("296f45b2-042c-43f7-b072-1069b814c821"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("3504fb37-a833-4f51-9635-9a3fa2dcacc8"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("86b260d0-e6f0-400e-949d-ce14e3d8ec24"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("b987028e-94ee-469c-8510-24fce1404434"));

            migrationBuilder.DeleteData(
                table: "Windows",
                keyColumn: "Id",
                keyValue: new Guid("e83b153a-7e39-4b34-9989-b0b4b8bbe441"));

            migrationBuilder.DeleteData(
                table: "Cabinets",
                keyColumn: "Id",
                keyValue: new Guid("35153787-5403-4a4e-a645-d3a254c6d153"));

            migrationBuilder.DeleteData(
                table: "Cabinets",
                keyColumn: "Id",
                keyValue: new Guid("586c3e9d-870f-4242-b985-37f6b146360d"));

            migrationBuilder.DeleteData(
                table: "Cabinets",
                keyColumn: "Id",
                keyValue: new Guid("8dce902d-483c-4a90-8541-4c9da65ae723"));

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
    }
}
