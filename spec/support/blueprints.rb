
require 'machinist/active_record'

# Type, TypeInclusion, Property from seeds

User.blueprint do
  name         { "Test User"                 }
  email        { "test#{sn}@localhost.local" }
  password     { "tigertiger"                }
  confirmed_at { Time.now                    }
end

