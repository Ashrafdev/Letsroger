<?php
use Migrations\AbstractMigration;

class Cocktails extends AbstractMigration
{
    public function up()
    {
        $table = $this->table('cocktails');
        $table
            ->addColumn('name', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('description', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('created', 'datetime', [
                'default' => 'CURRENT_TIMESTAMP',
                'limit' => null,
                'null' => false,
            ])
            ->addColumn('modified', 'datetime', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->create();

        $this->execute(
            "INSERT INTO `cocktails` (`name`,`description`,`created`,`modified`) VALUES " .
            "('Cosmopolitan', 'Vodka based', '2015-04-10 15:56:23', null)," .
            "('Margarita', 'Tequila based', '2015-04-10 15:59:39', null)," .
            "('Mojito', 'Rum based', '2015-04-11 09:52:01', null)," .
            "('Cuba Libre', 'Rum based', '2015-04-11 09:52:01', null)," .
            "('Caipirinha', 'Rum based', '2015-04-11 09:33:37', null)," .
            "('Tequila Sunrise', 'Tequila based', '2015-04-11 09:52:02', null)," .
            "('Bloody Mary', 'Vodka based', '2015-04-11 09:52:02', null)," .
            "('Black Velvet', 'Beer based', '2015-04-11 09:52:02', null)," .
            "('Martini', 'Gin based', '2015-04-11 09:52:02', null)," .
            "('Manhattan', 'Whiskey based', '2015-04-11 09:52:03', null)," .
            "('Bronx', 'Gin based', '2015-04-11 09:52:03', null)," .
            "('Rose', 'Gin bassed', '2015-04-11 09:52:03', null)," .
            "('Hot Shot', 'Coffee based', '2015-04-11 09:52:03', null)," .
            "('Parrot', 'Tequila based', '2015-04-11 09:52:03', null)," .
            "('Boxer', 'Whiskey based', '2015-04-11 09:52:03', null)," .
            "('Monkey', 'Cointreau based', '2015-04-11 09:52:03', null)," .
            "('Pink Panther', 'Cointreau based', '2015-04-11 09:52:03', null)," .
            "('Zombie', 'Rum based', '2015-04-11 09:52:03', null)," .
            "('Matador', 'Tequila based', '2015-04-11 09:52:03', null)," .
            "('B52', 'Cream based', '2015-04-11 09:52:03', null)," .
            "('Beach Runner', 'Gin based', '2015-04-11 09:52:03', null)"
        );
    }

    public function down()
    {
        $this->dropTable('cocktails');
    }
}
