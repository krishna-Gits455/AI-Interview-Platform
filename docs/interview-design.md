# Interview Design

## Fields

Interview

- _id
- title
- interviewer
- candidate
- candidateEmail
- language
- difficulty
- status
- scheduledAt
- createdAt
- updatedAt

## Language

- JavaScript
- Python
- Java
- C++

## Difficulty

- Easy
- Medium
- Hard

## Status

- Pending
- Scheduled
- Completed
- Cancelled

## Notes

interviewer:
Stores User._id reference

candidateEmail:
Stores candidate email

candidate:
Stores the accepted candidate User._id reference.
Remains null until the invitation is accepted.

scheduledAt:
Single Date object
