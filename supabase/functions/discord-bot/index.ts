// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Sift is a small routing library that abstracts away details like starting a
// listener on a port, and provides a simple function (serve) that has an API
// to invoke a function for a specific path.
import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";
// TweetNaCl is a cryptography library that we use to verify requests
// from Discord.
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

enum DiscordCommandType {
  Ping = 1,
  ApplicationCommand = 2,
}

// For all requests to "/" endpoint, we want to invoke home() handler.
serve({
  "/discord-bot": home,
});

// The main logic of the Discord Slash Command is defined in this function.
async function home(request: Request) {
  // validateRequest() ensures that a request is of POST method and
  // has the following headers.
  const { error } = await validateRequest(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // verifySignature() verifies if the request is coming from Discord.
  // When the request's signature is not valid, we return a 401 and this is
  // important as Discord sends invalid requests to test our verification.
  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json(
      { error: "Invalid request" },
      {
        status: 401,
      }
    );
  }

  const { type = 0, data = { options: [] } } = JSON.parse(body);
  // Discord performs Ping interactions to test our application.
  // Type 1 in a request implies a Ping interaction.
  if (type === DiscordCommandType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    });
  }

  // Type 2 in a request is an ApplicationCommand interaction.
  // It implies that a user has issued a command.
  if (type === DiscordCommandType.ApplicationCommand) {
    // Store these in an array for now; when it gets big can move them too supabase.
    const qisms = [
      "The greatest form of flattery is mimication.",
      "I'm just talking off the cuff of my pants.",
      "I'm massaging the air with my knowledge.",
      "You have so much shelf space that if you added books you'd need the desby doosby system.",
      "That's opening up a bag of worms.",
      "If you follow this  regiment, it will work!",
      "You're slow as a pancake!",
      "I'm singing about trials and turbulations.",
      "Those mittens add density to my hands. It messes with my articularity.",
      "My broken collar bone colisified.",
      "I just epiphasized that!",
      "Grab the rein by the horn.",
      "Tornadoes don't discriminate",
      "It's a night owl thing.",
      "When did we misfuck that up?",
      "That's hell trash!",
      "ButterFLY like a bee! Butterfly and bee man sitting in a tree!",
      `The grim reaper. AKA Mr. Death guy. He says it's time to die and people are like "yeah, okay!"`,
      "Can we all avoid this pissery?",
      "Winter might as well be my mistress.",
      "My skin told me it needed to be naturally kept",
      "I can tell when you leave the room because we are telekinectify!",
      "My grill has that click click click click click thing.",
      "And then I turn to you with eloquent eloquey.",
      "I'm an inclusiver!",
      "This is quite the encrapment!",
      "Whispering Callows - The Wailing Caverns Dungeon",
      "Arnold Math Guy - Albert Einstein",
      "Duck Soap - Dawn soap",
      "Coobolate - To associate one thing with another thing and then wobble back and forth trying to decide what the root cause is",
      "Wheaty weed things - reeds",
      "Square boobs - pecs",
      "Anti aliasing for legs - panty hose",
      "Hypocritisici - hypocritical/hypocrisy",
      "Repercations - ramifications/repercussions",
      "Corpeal - corporeal",
      "Piddle paddle - rowing but not going anywhere",
      "Happy marks - crows feet",
      "Chefnism - inner chef",
      "Hump hump - hint hint",
      "Chicken pickin - using ctrl+click to individually pick multiple items from a list",
      "Paisleys - things people wear on their boobs",
      "Slab of land - plot of land",
      "Wireless chicken - boneless chicken",
    ];

    let qism = qisms[Math.floor(Math.random() * qisms.length)];

    return json({
      // Type 4 responds with the below message retaining the user's
      // input at the top.
      type: 4,
      data: {
        content: `"${qism}" - (Q) Tony`,
      },
    });
  }

  // We will return a bad request error as a valid Discord request
  // shouldn't reach here.
  return json({ error: "bad request" }, { status: 400 });
}

/** Verify whether the request is coming from Discord. */
async function verifySignature(
  request: Request
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  // Discord sends these headers with every request.
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY)
  );

  return { valid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}
