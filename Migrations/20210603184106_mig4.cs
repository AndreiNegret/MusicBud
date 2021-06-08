using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicBud.Migrations
{
    public partial class mig4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlaylistsEmotions",
                columns: table => new
                {
                    PlaylistEmotionID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emotion = table.Column<string>(nullable: true),
                    Playlist = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaylistsEmotions", x => x.PlaylistEmotionID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlaylistsEmotions");
        }
    }
}
