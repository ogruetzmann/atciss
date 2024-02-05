"""sectorstatus_create

Revision ID: 3f916bf1ccf7
Revises: 2b6394ea5779
Create Date: 2023-12-23 16:32:13.840733+00:00

"""

from collections.abc import Sequence

import sqlalchemy as sa
import sqlmodel

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "3f916bf1ccf7"
down_revision: str | None = "2b6394ea5779"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "sectorstatus",
        sa.Column("id", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column(
            "status", sa.Enum("green", "orange", "red", "purple", name="status"), nullable=True
        ),
        sa.Column("changed_by_cid", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("sectorstatus")
