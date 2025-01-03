using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseProject.Migrations
{
    /// <inheritdoc />
    public partial class docpc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "privateclinical",
                table: "DoctorInfos",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "privateclinical",
                table: "DoctorInfos");
        }
    }
}
