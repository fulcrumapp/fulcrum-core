# Agent instructions

Never manually change the root `package.json` version, including for a
requested release. GitHub Actions manages it in a version-only commit on
`main` after validation. If a user or another tool changes it, flag the change and instruct
the user to revert the version without discarding other edits.
