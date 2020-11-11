using Microsoft.EntityFrameworkCore.Migrations;

namespace BeautySalon.ANGULAR.Migrations
{
    public partial class updateorder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goods_OrderGoods_OrderGoodsId",
                table: "Goods");

            migrationBuilder.DropIndex(
                name: "IX_Goods_OrderGoodsId",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "OrderGoodsId",
                table: "Goods");

            migrationBuilder.AddColumn<int>(
                name: "GoodsId",
                table: "OrderGoods",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderGoods_GoodsId",
                table: "OrderGoods",
                column: "GoodsId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderGoods_Goods_GoodsId",
                table: "OrderGoods",
                column: "GoodsId",
                principalTable: "Goods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderGoods_Goods_GoodsId",
                table: "OrderGoods");

            migrationBuilder.DropIndex(
                name: "IX_OrderGoods_GoodsId",
                table: "OrderGoods");

            migrationBuilder.DropColumn(
                name: "GoodsId",
                table: "OrderGoods");

            migrationBuilder.AddColumn<int>(
                name: "OrderGoodsId",
                table: "Goods",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Goods_OrderGoodsId",
                table: "Goods",
                column: "OrderGoodsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goods_OrderGoods_OrderGoodsId",
                table: "Goods",
                column: "OrderGoodsId",
                principalTable: "OrderGoods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
