import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type AppMetadata = {
    name : Text;
    description : Text;
    author : Text;
  };

  let appMetadata : AppMetadata = {
    name = "Countdown App";
    description = "A minimal countdown website.";
    author = "Theodor";
  };

  public query ({ caller }) func getAppMetadata() : async AppMetadata {
    appMetadata;
  };

  public shared ({ caller }) func updateAppMetadata(_ : Text) : async () {
    Runtime.trap("App metadata is immutable and cannot be changed.");
  };
};
