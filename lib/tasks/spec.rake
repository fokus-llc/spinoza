
Rake::Task['db:test:prepare'].enhance do
  Rake::Task['db:seed'].invoke
end

