# Q-isms API Documentation

This document describes the API endpoints available for the Q-isms Discord bot and general use.

## Endpoints

### `/api/qism`

Returns a random Q-ism quote in a general JSON format.

**Method:** GET or POST  
**Response Format:**
```json
{
  "success": true,
  "quote": "The greatest form of flattery is mimication.",
  "author": "Q (Tony)"
}
```

**Example Usage:**
```bash
curl http://localhost:3000/api/qism
```

### `/api/discord/qism`

Returns a random Q-ism quote formatted specifically for Discord bot interactions.

**Method:** GET or POST  
**Response Format:**
```json
{
  "type": 4,
  "data": {
    "content": "\"The greatest form of flattery is mimication.\"\n\n*- Q (Tony)*",
    "flags": 0
  }
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:3000/api/discord/qism
```

## Discord Bot Integration

The `/api/discord/qism` endpoint is designed to work with Discord slash commands. The response follows Discord's interaction response format:

- `type: 4` indicates `InteractionResponseType.ChannelMessageWithSource`
- `data.content` contains the formatted message that will appear in Discord
- `data.flags: 0` means the message will be visible to everyone in the channel

## Data Source

Both endpoints read from the same `public/data.json` file that contains all the Q-ism quotes. Each request returns a randomly selected quote from this collection.

## Error Handling

If there's an error reading the data file or processing the request, the endpoints will return a 500 status code with an appropriate error message.