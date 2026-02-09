import discord
from discord.ext import commands
from discord import app_commands
# This function checks if a user has specific permissions in the database. 
# It returns True if the user has permissions, and False otherwise.
def user_specific_perms(supabase):
    async def predicate(obj):
        if isinstance(obj, commands.Context):
            user_id = obj.author.id
            print(f"Checking permissions for user ID: {user_id} in command context.")
        elif isinstance(obj, discord.Interaction):
            user_id = obj.user.id
            print(f"Checking permissions for user ID: {user_id} in interaction context.")
        else:
            return False  # If it's neither, deny access
        # Query the database for the user's permissions
        response = (
            supabase
            .table("AUTHORIZED_BOT_USERS")
            .select("*")
            .eq("USER_ID", user_id)
            .execute()
        )
        data = response.data
        if bool(data):
            # Check if the user has the required permissions
            print(f"User ID: {user_id} - Permissions: {data}")
            return bool(data)  # Return True if permissions exist, False otherwise
        return False
    def decorator(func):
        print(f"Applying user_specific_perms decorator to {func.__name__}")
        func = commands.check(predicate)(func)
        func = app_commands.check(predicate)(func)
        return func
    
    return decorator