class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :bio
end
