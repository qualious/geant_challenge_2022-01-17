"""User:email and User:password added. User:nickname is now unique

Revision ID: db43b211a88b
Revises: 41d227f5ff52
Create Date: 2022-01-15 15:54:23.444528

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'db43b211a88b'
down_revision = '41d227f5ff52'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('email', sa.String(), nullable=False))
    op.add_column('users', sa.Column('password', sa.LargeBinary(length=100), nullable=False))
    op.alter_column('users', 'nickname',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.create_unique_constraint(None, 'users', ['email'])
    op.create_unique_constraint(None, 'users', ['nickname'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_constraint(None, 'users', type_='unique')
    op.alter_column('users', 'nickname',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_column('users', 'password')
    op.drop_column('users', 'email')
    # ### end Alembic commands ###