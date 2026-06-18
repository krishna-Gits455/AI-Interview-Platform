# Room Design

## V1 Decision

An interview is also its room in V1.

- No separate Room model
- The Interview ID is the Room ID
- Room access and room details come from the Interview document

## Access Rules

Only the interviewer who created the interview can enter the room.

- Missing interview: `404 Not Found`
- Another authenticated user: `403 Forbidden`

Candidate access and participant joining will be designed later.

## Endpoint

`GET /api/rooms/:roomId`

```json
{
  "roomId": "...",
  "title": "Frontend Interview",
  "language": "JavaScript",
  "difficulty": "Medium",
  "interviewer": {
    "id": "...",
    "name": "Rahul"
  }
}
```
